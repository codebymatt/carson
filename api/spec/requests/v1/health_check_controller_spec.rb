# frozen_string_literal: true

require "rails_helper"

describe V1::HealthCheckController, type: :request do
  context "when the application is healthy" do
    before { get "/v1/healthcheck" }

    it "returns successfully" do
      expect(response).to have_http_status :ok
      expect(json_body.message).to eq "Everything's ok!"
    end
  end
end
