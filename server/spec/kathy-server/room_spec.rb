require 'spec_helper'

describe "Room" do
  subject { KathyServer::Room.new }
  
  its(:name) { should == "matte" }
  its(:id)   { should == 1 }
  
  describe "#transmit" do
    it "sends the socket the message" do
      expect { @user.transmit("hello") }.to change { @sock.out }.to("hello")
    end
  end
end
