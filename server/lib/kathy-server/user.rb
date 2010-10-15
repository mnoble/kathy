module KathyServer
  class User
    attr_reader :id, :name
  
    def initialize(socket)
      @socket = socket
      @id     = socket.signature
      @name   = socket.request["Query"]["name"]
    end
  
    def transmit(data)
      @socket.send(data)
    end
  end
end
