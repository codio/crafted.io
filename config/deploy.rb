# config valid only for Capistrano 3.1
lock '3.1.0'

set :application, 'crafted-site'
set :repo_url, 'https://github.com/codio/crafted.io.git'
set :branch, proc { `git rev-parse --abbrev-ref HEAD`.chomp }

set :deploy_to, '/var/www/crafted/site'
set :scm, :git

set :npm_flags, '--silent'


after 'deploy:updated', :build do
  on roles(:all) do |host|
    within release_path do
      execute :grunt, :build
    end
  end
end
