# frozen_string_literal: true

module V1
  # Handles requests to manage Recipes.
  class RecipeItemsController < ApiController
    before_action :set_recipe_item, except: [:create, :index]
    before_action :set_recipe, only: [:create, :index]

    def index
      recipe_items = @recipe.recipe_items
      api_success(recipe_items: recipe_items.to_a.map(&:serialize))
    end

    def create
      recipe_item = @recipe.recipe_items.new(allowed_params)

      if recipe_item.save
        api_success(recipe_item: recipe_item.serialize)
      else
        api_failure(errors: recipe_item.errors)
      end
    end

    def show
      api_success(recipe_item: @recipe_item.serialize)
    end

    def update
      if @recipe_item.update(allowed_params)
        api_success(recipe_item: @recipe_item.serialize)
      else
        api_failure(errors: @recipe_item.errors)
      end
    end

    def destroy
      if @recipe_item.destroy
        api_success(recipe_item: @recipe_item.serialize)
      else
        api_failure(errors: @recipe_item.errors)
      end
    end

    private

    def allowed_params
      params.require(:recipe_item).permit(:unit, :quantity, :description, :item_id)
    end

    def set_recipe_item
      @recipe_item = RecipeItem.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      api_not_found
    end

    def set_recipe
      @recipe = Recipe.find(params[:recipe_id])
    rescue ActiveRecord::RecordNotFound
      api_not_found
    end
  end
end
