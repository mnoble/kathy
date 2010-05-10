#!/usr/bin/env ruby
require 'rubygems'
require 'em-websocket'
require 'json'

class Client
  attr_reader :id, :name
  
  def initialize(socket)
    p socket
    @socket = socket
    @id     = socket.signature
    @name   = socket.request["Query"]["name"]
  end
  
  def send(msg)
    @socket.send({ :name => @name, :msg => msg }.to_json)
  end
end

EventMachine.run do
  @clients = []
  EventMachine::WebSocket.start(:host => "0.0.0.0", :port => 8080) do |socket|
    socket.onopen    { @clients << Client.new(socket) }
    socket.onmessage { |data| @clients.each { |client| client.send data }}
    socket.onclose   { socket.send "Adios." }
  end
end
