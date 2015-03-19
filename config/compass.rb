# Config definitions
@assets_dir = "assets"
css_dir = @assets_dir
sass_dir = "sass"
javascripts_dir = "scripts"
javascript_www_dir = "www-scripts"
sourcemap = true
output_style = :compressed

# Saves CSS files as liquid
on_stylesheet_saved do |filename|
  if File.exists?(filename)
    # Break up the path
    path = File.dirname(filename) + "/"
    file = File.basename(filename, ".*")
    extension = ".scss.liquid"
    
    # Move the file to new location
    FileUtils.mv filename, path + file + extension
  end
end

# Copy over directorys to assets folder
# This allows us to keep a folder structure
# This will flatten any directory structure

# Keep a collection of filenames, so we make sure
# no duplicate files exist when we flatten

def watch_and_flatten_dir(source, dest=@assets_dir, extension="")
  # Keep a record of files, to detect duplicates
  files = []
  
  # Add a trailing slash if non provided
  source += "/" unless source =~ /\/$/
  dest += "/" unless dest =~ /\/$/
  
  # Watch the directory
  watch source + "**/*" do |project_dir, relative_path|
    # Create the file
    file = File.join(project_dir, relative_path)
    
    # Sets the final path for the file
    destination = dest + File.basename(file) + extension
    
    # If the file was freshly added or modified
    if File.exists?(file)
      FileUtils.cp(file, destination)
      Compass::Logger.new.record(:write, destination)
      
      # Check for duplicate files
      files << file unless files.include?(file)
      files.reject{|f| f == file}.each do |f|
        # If a file from a different folder has the same name, throw an error
        if File.basename(f) == File.basename(file)
          Compass::Logger.new.record(:error, 
                                    "duplicate files found: #{file} and #{f}")
          Compass::Logger.new.record(:warning, 
                                    "make sure you don't name files the same,
                                     even if in different directories")
        end
      end
    else 
      # If the file was deleted
      if File.exists?(destination)
        FileUtils.rm(destination)
        Compass::Logger.new.record(:deleted, destination)
        files.delete(file)
      end
    end
  end
end

# Files to copy to assets folder
[javascript_www_dir + "/source/app", javascript_www_dir + "/build/app"].each do |source|
  watch_and_flatten_dir(source)
end

# Copy images to assets
watch_and_flatten_dir("images/")

# Copy scripts to source www-scripts/source
watch_and_flatten_dir(javascripts_dir, javascript_www_dir + "/source/app")

