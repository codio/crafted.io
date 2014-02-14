set :stage, :production

server 'web3.int.codio.com', user: 'capistrano', roles: %w{web app db}
server 'web4.int.codio.com', user: 'capistrano', roles: %w{web app db}
