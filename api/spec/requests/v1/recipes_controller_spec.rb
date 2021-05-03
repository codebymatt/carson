# frozen_string_literal: true

require "rails_helper"

describe V1::RecipesController, type: :request do
  context "when creating a recipe" do
    context "with valid params" do
      let(:params) { {recipe: {name: "Shakshuka"}} }

      before { post "/v1/recipes.json", params: params }

      it "succeeds" do
        expect(response).to have_http_status :ok
        expect(Recipe.last.name).to eq params[:recipe][:name]
      end
    end

    context "with invalid params" do
      let(:params) { {recipe: {link: "example.com/shakshuka"}} }

      before { post "/v1/recipes.json", params: params }

      it "fails" do
        expect(response).to have_http_status :bad_request
        expect(Recipe.count).to eq 0
      end
    end
  end
end
