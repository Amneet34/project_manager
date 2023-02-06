class RequestsController < ApplicationController
  before_action :set_request, only: %i[ show update destroy ]

  # GET /requests
  def index
   render json: Request.all
  end

  # GET /requests/1
  def show
    request = Request.find_by!(id: params[:id])
    render json: request
  end

  # POST /requests
  def create
    request = Request.find_by!(id: params[:id])
    request = Request.create!(user_id: params[:user_id], content: params[:content])
    
  end

  # PATCH/PUT /requests/1
  def update
    if @request.update(request_params)
      render json: @request
    else
      render json: @request.errors, status: :unprocessable_entity
    end
  end

  # DELETE /requests/1
  def destroy
    request = Request.find_by!(id: params[:id]).destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_request
      @request = Request.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def request_params
      params.fetch(:request, {})
    end
end
