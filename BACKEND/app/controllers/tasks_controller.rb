class TasksController < ApplicationController
  before_action :set_task, only: %i[show, update, destroy]

  def index
    @tasks = Task.all
    render json: @tasks
  end

  def show
    task = Task.find_by(id: params[:id])
    render json: task
  end

  def create
    @task = Task.new(task_params)
    if @task.save
      render json: @task, status: :created
    else
      render json: { errors: @task.errors }, status: :unprocessable_entity
    end
  end

 def update
 task = Task.find_by(id: params[:id])
 task.update(completed: params[:completed])
 render json: task
 end


  def destroy
    @task.destroy
    head :no_content
  end

  private

  def set_task
    @task = Task.find_by(id: params[:id])
  end

  def task_params
    params.permit(:name, :priority_level, :description, :completed)
  end
end

