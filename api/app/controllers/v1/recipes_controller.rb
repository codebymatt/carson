# frozen_string_literal: true

module V1
  # Handles requests to manage Recipes.
  class RecipesController < ApiController
    before_action :set_recipe, except: [:create, :index]

    def index
      recipes = Recipe.all.each(&:serialize)
      api_success(recipes: recipes)
    end

    def create
      @recipe = Recipe.new(allowed_params)

      if @recipe.save
        api_success(recipe: @recipe.serialize)
      else
        api_failure(@recipe.errors)
      end
    end

    def show
      api_success(recipe: @recipe)
    end

    def update
      if @recipe.update(allowed_params)
        api_success(recipe: @recipe)
      else
        api_failure("Could not update recipe: #{@recipe.errors}")
      end
    end

    def destroy
      if @recipe.destroy
        api_success(recipe: @recipe)
      else
        api_failure("Could not destroy recipe: #{@recipe.errors}")
      end
    end

    private

    def allowed_params
      params.require(:recipe).permit(:name, :link)
    end

    def set_recipe
      @recipe = Recipe.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      api_not_found
    end
  end
end
