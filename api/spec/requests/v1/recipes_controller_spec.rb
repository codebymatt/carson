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

  describe "when retrieving recipes" do
    let(:returned_recipes_length) { json_body.recipes.length }

    context "when recipes exist" do
      before do
        create_list(:recipe, 3)
        get "/v1/recipes.json"
      end

      it "returns all recipes" do
        expect(returned_recipes_length).to eq(3)
      end
    end

    context "when no recipes exist" do
      before { get "/v1/recipes.json" }

      it "returns 0 recipes" do
        expect(returned_recipes_length).to eq(0)
      end
    end
  end

  describe "when showing a recipe" do
    context "when the recipe exists" do
      let(:recipe) { create(:recipe, name: "Cucumber Salad") }
      before { get "/v1/recipes/#{recipe.id}.json" }

      it "returns it" do
        expect(response).to have_http_status :ok
        expect(json_body.recipe["name"]).to eq "Cucumber Salad"
      end
    end

    context "when the recipe doesn't exist" do
      before { get "/v1/recipes/42.json" }

      it "returns a 404" do
        expect(response).to have_http_status :not_found
        expect(json_body.message).to eq "Resource not found."
      end
    end
  end

  describe "when updating a recipe" do
    context "with valid params" do
      let(:recipe) { create(:recipe, name: "Tomato Salad") }
      let(:params) { {recipe: {name: "Cucumber Salad"}} }

      before { put "/v1/recipes/#{recipe.id}.json", params: params }

      it "succeeds" do
        expect(response).to have_http_status :ok
        expect(recipe.reload.name).to eq(params[:recipe][:name])
      end

      it "returns the updated recipe" do
        expect(json_body.recipe["name"]).to eq(params[:recipe][:name])
      end
    end

    context "with invalid params" do
      let(:recipe) { create(:recipe, name: "Watermelon Salad") }
      let(:params) { {recipe: {name: ""}} }

      before { put "/v1/recipes/#{recipe.id}.json", params: params }

      it "returns a failed request" do
        expect(response).to have_http_status :bad_request
      end

      it "doesn't update the recipe" do
        expect(recipe.reload.name).to eq("Watermelon Salad")
      end
    end
  end

  describe "when destroying a recipe" do
    context "when the recipe exists" do
      let(:recipe) { create(:recipe, name: "Cucumber Salad") }

      before { delete "/v1/recipes/#{recipe.id}.json" }

      it "succeeds" do
        expect(response).to have_http_status :ok
        expect { Recipe.find(recipe.id) }.to raise_error(ActiveRecord::RecordNotFound)
      end

      it "returns the destroyed recipes attributes " do
        expect(json_body.recipe["name"]).to eq("Cucumber Salad")
      end
    end

    context "when the recipe doesn't exist" do
      before { delete "/v1/recipes/42.json" }

      it "returns a 404" do
        expect(response).to have_http_status :not_found
      end
    end
  end
end
