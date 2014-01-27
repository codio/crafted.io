set :stage, :production

server 'web1.int.codio.com', user: 'deploy', roles: %w{web app db}
server 'web2.int.codio.com', user: 'deploy', roles: %w{web app db}
