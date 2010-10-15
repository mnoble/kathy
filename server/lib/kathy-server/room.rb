require 'json'

module KathyServer
  class Room
    attr_accessor :users

    def initialize
      @users = {}
    end

    def send_to_users(json)
      @users.each { |id, user| user.transmit json }
    end
  
    def add_user(socket)
      user = User.new(socket)
      @users[socket.signature] = user
      send_to_users({ :event => :joined, :name => user.name }.to_json)
    end

    def remove_user(socket)
      user = @users.delete(socket.signature)
      send_to_users({ :event => :disconnect, :name => user.name }.to_json)
    end
  end
end
