require 'spec_helper'

describe "User" do
  before(:all) do
    @sock = SpecHelper::FakeWebSocket.new
    @user = KathyServer::User.new(@sock)
  end
  
  subject { @user }
  
  its(:name) { should == "matte" }
  its(:id)   { should == 1 }
  
  describe "#transmit" do
    it "sends the socket the message" do
      expect { @user.transmit("hello") }.to change { @sock.out }.to("hello")
    end
  end
end
