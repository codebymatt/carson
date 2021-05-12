# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :v1, constraints: {format: :json} do
    get "/", to: "health_check#health_check", as: :index, only: [:get]
    get "/healthcheck", to: "health_check#health_check", as: :healthcheck, only: [:get]

    resources :items, except: [:new, :edit]

    resources :recipes, except: [:new, :edit] do
      resources :recipe_items, except: [:new, :edit]
    end

    resources :lists, except: [:new, :edit] do
      resources :list_items, except: [:new, :edit]
    end
  end
end
