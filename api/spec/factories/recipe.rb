# frozen_string_literal: true

FactoryBot.define do
  factory :recipe do
    name { Faker::Food.dish }
    link { Faker::Internet.domain_name }
  end
end
