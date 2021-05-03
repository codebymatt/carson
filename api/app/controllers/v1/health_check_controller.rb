# frozen_string_literal: true

module V1
  # Provide a basic healthcheck.
  class HealthCheckController < ApiController
    def health_check
      api_success(message: "Everything's ok!")
    end
  end
end
