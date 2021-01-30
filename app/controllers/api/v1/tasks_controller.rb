module Api
    module V1
        class TasksController < ApplicationController
            skip_before_action :verify_authenticity_token
            def index
                tasks = Task.all
                render json: TaskSerializer.new(tasks).serialized_json
            end

            def show
                task = Task.find_by(id: params[:id])
                render json: TaskSerializer.new(task).serialized_json
            end

            def create
                task = Task.new(task_params)

                if task.save
                    render json: TaskSerializer.new(task).serialized_json
                else
                    render json: {error: task.errors.messages}, status: 422
                end
            end

            def update
                task = Task.find_by(id: params[:id])

                if task.update(task_params)
                    render json: TaskSerializer.new(task).serialized_json
                else
                    render json: {error: task.errors.messages}, status: 422
                end
            end

            def destroy
                task = Task.find_by(id: params[:id])

                if task.destroy
                    render head: no_content
                else
                    render json: {error: task.errors.messages}, status: 422
                end
            end

            private

            def task_params
                params.require(:task).permit(:title, :description, :category_id, :completed)
            end
        end
    end
end