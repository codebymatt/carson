# frozen_string_literal: true

# Holds shared functionality across models.
module CarsonModel
  def formatted_errors
    errors.flat_map(&:type)
  end
end
