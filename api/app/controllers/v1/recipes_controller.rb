# frozen_string_literal: true

module V1
  # Handles requests to manage Recipes.
  class RecipesController < ApiController
    before_action :set_recipe, except: [:create, :index]

    def index
      recipes = Recipe.order(created_at: :desc).all.to_a.map(&:serialize)
      api_success(recipes: recipes)
    end

    def create
      @recipe = Recipe.new(allowed_params)

      if @recipe.save
        api_success(recipe: @recipe.serialize)
      else
        api_failure(resource: @recipe)
      end
    end

    def show
      api_success(recipe: @recipe.serialize)
    end

    def update
      if @recipe.update(allowed_params)
        api_success(recipe: @recipe.serialize)
      else
        api_failure(resource: @recipe)
      end
    end

    def destroy
      if @recipe.destroy
        api_success(recipe: @recipe.serialize)
      else
        api_failure(resource: @recipe)
      end
    end

    private

    def allowed_params
      params.require(:recipe).permit(:name, :link, :servings, :calories)
    end

    def set_recipe
      @recipe = Recipe.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      api_not_found
    end
  end
end
