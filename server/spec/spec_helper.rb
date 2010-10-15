$LOAD_PATH.unshift(File.dirname(__FILE__))
$LOAD_PATH.unshift(File.join(File.dirname(__FILE__), '..', 'lib'))
require 'kathy-server'
require 'spec'
require 'spec/autorun'
require 'addressable/uri'

module SpecHelper
  class FakeWebSocket
    attr_accessor :signature, :options, :debug, :state, :request, :data,
                  :skip_onclose, :onopen, :onmessage, :onclose, :out
                  
    def initialize
      @signature    = 1
      @options      = { :host=>"0.0.0.0", :port=>"8080" }
      @debug        = false
      @state        = :connected
      @data         = ""
      @skip_onclose = false
      @onopen       = Proc.new { p "Socket openned." }
      @onmessage    = Proc.new { p "Message received." }
      @onclose      = Proc.new { p "Socket closed." }
      @request      = {
        "Path"       => "/?name=matte",
        "Upgrade"    => "WebSocket",
        "Connection" => "Upgrade",
        "Query"      => { "name"=>"matte" },
        "Host"       => { "Origin" => nil }
      }
    end
    
    def send(message)
      @out = message
    end
  end
end
