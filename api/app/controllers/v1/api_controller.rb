# frozen_string_literal: true

module V1
  # Contains common functionality for basic controllers.
  class ApiController < ApplicationController
    before_action :set_default_response_format

    def api_success(opts = {})
      status = opts.empty? ? 204 : 200
      render(status: status, json: {status: status}.merge(opts))
    end

    def api_failure(errors: [], message: "", status: 400)
      render(status: status, json: {status: status, message: message, error: errors})
    end

    def api_not_found
      render(status: 404, json: {status: 404, message: "Resource not found."})
    end

    private

    def set_default_response_format
      request.format = :json
    end
  end
end
