# frozen_string_literal: true

module V1
  # Handles requests to manage Lists.
  class ListItemsController < ApiController
    before_action :set_list_item, except: [:create, :index]
    before_action :set_list, only: [:create, :index]

    def index
      list_items = @list.list_items
      api_success(list_items: list_items.to_a.map(&:serialize))
    end

    def create
      list_item = @list.list_items.new(allowed_params)

      if list_item.save
        api_success(list_item: list_item.serialize)
      else
        api_failure(errors: list_item.errors)
      end
    end

    def show
      api_success(list_item: @list_item.serialize)
    end

    def update
      if @list_item.update(allowed_params)
        api_success(list_item: @list_item.serialize)
      else
        api_failure(errors: @list_item.errors)
      end
    end

    def destroy
      if @list_item.destroy
        api_success(list_item: @list_item.serialize)
      else
        api_failure(errors: @list_item.errors)
      end
    end

    private

    def allowed_params
      params.require(:list_item).permit(:multiplier, :description, :item_id)
    end

    def set_list_item
      @list_item = ListItem.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      api_not_found
    end

    def set_list
      @list = List.find(params[:list_id])
    rescue ActiveRecord::RecordNotFound
      api_not_found
    end
  end
end
