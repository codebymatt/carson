# frozen_string_literal: true

require "rails_helper"

describe V1::RecipeItemsController, type: :request do
  let(:recipe) { create(:recipe, name: "Watermelon Salad") }
  let(:watermelon_item) { create(:item, name: "Watermelon", unit: "whole", base_quantity: 1) }

  context "when creating a recipe item" do
    context "with valid params" do
      let(:params) do
        {recipe_item: {multiplier: 0.25, description: "Chopped", item_id: watermelon_item.id}}
      end

      before { post "/v1/recipes/#{recipe.id}/recipe_items.json", params: params }

      it "succeeds" do
        expect(response).to have_http_status :ok
        expect(RecipeItem.last.item_id).to eq watermelon_item.id
      end
    end

    context "with invalid params" do
      let(:params) do
        {recipe_item: {multiplier: -1, description: "Chopped", item_id: watermelon_item.id}}
      end

      before { post "/v1/recipes/#{recipe.id}/recipe_items.json", params: params }

      it "fails" do
        expect(response).to have_http_status :bad_request
        expect(RecipeItem.count).to eq 0
      end
    end
  end

  describe "when retrieving recipe_items" do
    let(:returned_recipe_items_length) { json_body.recipe_items.length }

    context "when recipe items exist" do
      let(:recipe) { create(:recipe) }

      before do
        create_list(:recipe_item, 3, recipe: recipe)
        get "/v1/recipes/#{recipe.id}/recipe_items.json"
      end

      it "returns all recipe_items" do
        expect(returned_recipe_items_length).to eq(3)
      end
    end

    context "when no recipe items exist" do
      before { get "/v1/recipes/#{recipe.id}/recipe_items.json" }

      it "returns 0 recipe items" do
        expect(returned_recipe_items_length).to eq(0)
      end
    end
  end

  describe "when showing a recipe item" do
    context "when the recipe item exists" do
      let(:recipe_item) { create(:recipe_item) }
      before { get "/v1/recipes/#{recipe_item.recipe.id}/recipe_items/#{recipe_item.id}.json" }

      it "returns it" do
        expect(response).to have_http_status :ok
        expect(json_body.recipe_item["name"]).to eq recipe_item.name
      end
    end

    context "when the item doesn't exist" do
      let(:recipe) { create(:recipe) }

      before { get "/v1/recipes/#{recipe.id}/recipe_items/42.json" }

      it "returns a 404" do
        expect(response).to have_http_status :not_found
        expect(json_body.message).to eq "Resource not found."
      end
    end
  end

  describe "when updating a recipe item" do
    context "with valid params" do
      let(:recipe_item) { create(:recipe_item) }
      let(:params) { {recipe_item: {multiplier: 25}} }
      let(:update_url) { "/v1/recipes/#{recipe_item.recipe_id}/recipe_items/#{recipe_item.id}.json" }

      before { put update_url, params: params }

      it "succeeds" do
        expect(response).to have_http_status :ok
        expect(recipe_item.reload.multiplier).to eq(25)
      end

      it "returns the updated recipe item" do
        expect(json_body.recipe_item["multiplier"]).to eq(params[:recipe_item][:multiplier])
      end
    end

    context "with invalid params" do
      let(:recipe_item) { create(:recipe_item, multiplier: 2) }
      let(:params) { {recipe_item: {multiplier: -1}} }
      let(:update_url) { "/v1/recipes/#{recipe_item.recipe_id}/recipe_items/#{recipe_item.id}.json" }

      before { put update_url, params: params }

      it "returns a failed request" do
        expect(response).to have_http_status :bad_request
      end

      it "doesn't update the recipe item" do
        expect(recipe_item.reload.multiplier).to eq(2)
      end
    end
  end

  describe "when destroying a recipe item" do
    context "when the recipe item exists" do
      let(:recipe_item) { create(:recipe_item) }
      let(:destroy_url) do
        "/v1/recipes/#{recipe_item.recipe.id}/recipe_items/#{recipe_item.id}.json"
      end

      before { delete destroy_url }

      it "succeeds" do
        expect(response).to have_http_status :ok
        expect { RecipeItem.find(recipe_item.id) }.to raise_error(ActiveRecord::RecordNotFound)
      end

      it "returns the destroyed items attributes " do
        expect(json_body.recipe_item["name"]).to eq(recipe_item.name)
      end
    end

    context "when the item doesn't exist" do
      let(:recipe) { create(:recipe_item) }
      before { delete "/v1/recipes/#{recipe.id}/recipe_items/42.json" }

      it "returns a 404" do
        expect(response).to have_http_status :not_found
      end
    end
  end
end
