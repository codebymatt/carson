# frozen_string_literal: true

require "rails_helper"

RSpec.describe Item, type: :model do
  it { is_expected.to validate_presence_of :name }
  it { is_expected.to validate_uniqueness_of(:name) }

  xit "cannot be deleted when associated recipe or list items exist" do

  end
end
