# frozen_string_literal: true

module V1
  # Handles requests to manage Items.
  class ItemsController < ApiController
    before_action :set_item, except: [:create, :index]

    def index
      items = Item.order(created_at: :desc).all.to_a.map(&:serialize)
      api_success(items: items)
    end

    def create
      @item = Item.new(allowed_params)

      if @item.save
        api_success(item: @item.serialize)
      else
        api_failure(errors: @item.errors)
      end
    end

    def show
      api_success(item: @item)
    end

    def update
      if @item.update(allowed_params)
        api_success(item: @item)
      else
        api_failure(errors: @item.errors)
      end
    end

    def destroy
      if @item.destroy
        api_success(item: @item)
      else
        api_failure(errors: @item.errors)
      end
    end

    private

    def allowed_params
      params.require(:item).permit(:name, :unit, :base_quantity)
    end

    def set_item
      @item = Item.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      api_not_found
    end
  end
end
