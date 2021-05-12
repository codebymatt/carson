# frozen_string_literal: true

module V1
  # Handles requests to manage Lists.
  class ListsController < ApiController
    before_action :set_list, except: [:create, :index]

    def index
      lists = List.all.to_a.map(&:serialize_basic)
      api_success(lists: lists)
    end

    def create
      @list = List.new(allowed_params)

      if @list.save
        api_success(list: @list.serialize)
      else
        api_failure(errors: @list.errors)
      end
    end

    def show
      api_success(list: @list.serialize)
    end

    def update
      if @list.update(allowed_params)
        api_success(list: @list)
      else
        api_failure(errors: @list.errors)
      end
    end

    def destroy
      if @list.destroy
        api_success(list: @list.serialize)
      else
        api_failure(errors: @list.errors)
      end
    end

    private

    def allowed_params
      params.require(:list).permit(:name, :completed)
    end

    def set_list
      @list = List.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      api_not_found
    end
  end
end
