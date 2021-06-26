# frozen_string_literal: true

require "rails_helper"

describe V1::ItemsController, type: :request do
  context "when creating an item" do
    context "with valid params" do
      let(:params) { {item: {name: "Tomato"}} }

      before { post "/v1/items.json", params: params }

      it "succeeds" do
        expect(response).to have_http_status :ok
        expect(Item.last.name).to eq params[:item][:name]
      end
    end

    context "with invalid params" do
      let(:params) { {item: {unit: "whole"}} }

      before { post "/v1/items.json", params: params }

      it "fails" do
        expect(response).to have_http_status :bad_request
        expect(Item.count).to eq 0
      end
    end
  end

  describe "when retrieving items" do
    let(:returned_items_length) { json_body.items.length }

    context "when items exist" do
      before do
        create_list(:item, 3)
        get "/v1/items.json"
      end

      it "returns all items" do
        expect(returned_items_length).to eq(3)
      end
    end

    context "when no items exist" do
      before { get "/v1/items.json" }

      it "returns 0 items" do
        expect(returned_items_length).to eq(0)
      end
    end
  end

  describe "when showing an item" do
    context "when the item exists" do
      let(:cucumber_item) { create(:item, name: "Cucumber") }
      before { get "/v1/items/#{cucumber_item.id}.json" }

      it "returns it" do
        expect(response).to have_http_status :ok
        expect(json_body.item["name"]).to eq "Cucumber"
      end
    end

    context "when the item doesn't exist" do
      before { get "/v1/items/42.json" }

      it "returns a 404" do
        expect(response).to have_http_status :not_found
        expect(json_body.message).to eq "Resource not found."
      end
    end
  end

  describe "when updating an item" do
    context "with valid params" do
      let(:tomato_item) { create(:item) }
      let(:params) { {item: {name: "Chopped tomatoes"}} }

      before { put "/v1/items/#{tomato_item.id}.json", params: params }

      it "succeeds" do
        expect(response).to have_http_status :ok
        expect(tomato_item.reload.name).to eq(params[:item][:name])
      end

      it "returns the updated item" do
        expect(json_body.item["name"]).to eq(params[:item][:name])
      end
    end

    context "with invalid params" do
      let(:tomato_item) { create(:item, name: "Tomatoes") }
      let(:params) { {item: {name: nil}} }

      before { put "/v1/items/#{tomato_item.id}.json", params: params }

      it "returns a failed request" do
        expect(response).to have_http_status :bad_request
      end

      it "doesn't update the item" do
        expect(tomato_item.reload.name).to eq("Tomatoes")
      end
    end
  end

  describe "when destroying an item" do
    context "when the item exists" do
      let(:cucumber_item) { create(:item, name: "Cucumber") }

      before { delete "/v1/items/#{cucumber_item.id}.json" }

      it "succeeds" do
        expect(response).to have_http_status :ok
        expect { Item.find(cucumber_item.id) }.to raise_error(ActiveRecord::RecordNotFound)
      end

      it "returns the destroyed items attributes " do
        expect(json_body.item["name"]).to eq("Cucumber")
      end
    end

    context "when the item doesn't exist" do
      before { delete "/v1/items/42.json" }

      it "returns a 404" do
        expect(response).to have_http_status :not_found
      end
    end
  end
end
