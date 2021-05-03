# frozen_string_literal: true

# Helper methods for testing requests.
module RequestHelper
  def json_body
    OpenStruct.new(JSON.parse(response.body))
  end
end
