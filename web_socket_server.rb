#!/usr/bin/env ruby
require 'rubygems'
require 'em-websocket'
require 'json'

class Client
  attr_reader :id, :name
  
  def initialize(socket)
    @socket = socket
    @id     = socket.signature
    @name   = socket.request["Query"]["name"]
  end
  
  def send(data)
    @socket.send data
  end
end

EventMachine.run do
  @clients = {}
  EventMachine::WebSocket.start(:host => "0.0.0.0", :port => 8080) do |socket|
    
    socket.onopen do
      @clients[socket.signature] = Client.new(socket)
      
      @clients.each do |id, client|
        client.send({ :joined => @clients[socket.signature].name }.to_json)
      end
    end
    
    socket.onmessage do |data|
      @clients.each { |id, client| client.send data }
    end
    
    socket.onclose do
      @clients.each do |id, client|
        client.send({ :disconnect => @clients[socket.signature].name }.to_json)
      end
    end
    
  end
end
