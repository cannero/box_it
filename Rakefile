task default: %w[run]

task :run do
  sh "sudo docker-compose up" do |ok, res|
    if !ok && res.exitstatus != 130
      puts "failed with <#{res}>"
    end
  end
end

task :test do
  sh "sudo docker-compose run --rm dev_react npm test" do |ok, res|
    if !ok && res.exitstatus != 130
      puts "failed with <#{res}>"
    end
  end
end

task :devel do
  sh "sudo docker-compose run --service-ports --rm dev_react bash" do |ok, res|
    if ok || res.exitstatus == 130
      #puts "ok"
    else
      puts "failed with <#{res}>"
      puts "exit status <#{res.exitstatus}>"
    end
  end
end

task :csslint do
  sh "sudo docker-compose run --rm dev_react npx stylelint \"**/*.css\"" do |ok, res|
    if !ok
      puts res
      puts res.exitstatus
    end
  end
end
