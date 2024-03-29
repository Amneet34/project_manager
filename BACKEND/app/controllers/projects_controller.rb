class ProjectsController < ApplicationController
  before_action :set_project, only: %i[ show update destroy ]

  # GET /projects
  def index
   render json: Project.all
  end

  # GET /projects/1
 def show
  project = Project.find_by(id: params[:id])
  if project.image.attached?
    render json: {
      id: project.id,
      name: project.name,
      description: project.description,
      image_url: rails_blob_url(project.image)
    }
  else
    render json: { error: 'Image not found' }, status: :not_found
  end
end
  # POST /projects
  def create
  project = Project.create!(project_params)
  if params[:images]
    project.image.attach(params[:image])
  end
  render json: project
end

  # def create
  #   project = Project.create!(description: params[:description], image: params[:image], name: params[:name])
  #   render json: project
  # end

  # PATCH/PUT /projects/1
  def update
    project = Project.find_by(id:params[:id])
    project.update(description: params[:description], image: params[:image], name: params[:name])
    render json: project
  end

  # DELETE /projects/1
  def destroy
    project = Project.find_by(id:params[:id])
    project.destroy 
    render json: project
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_project
      @project = Project.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def project_params
      params.permit(:name, :description, :image)
    end
end
