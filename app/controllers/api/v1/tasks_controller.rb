module Api
    module V1
        class TasksController < ApplicationController

            def index
                tasks = Task.all
                render json: TaskSerializer.new(tasks).serialized_json
            end

            def show
                task = task.find_by(id: params[:id])
                render json: TaskSerializer.new(task).serialized_json
            end

            def update
                task = task.find_by(id: params[:id])

                if task.update(task_params)
                    render json: TaskSerializer.new(task).serialized_json
                else
                    render json: {error: task.errors.messages}, status: 422
                end
            end

            def destroy
                task = task.find_by(id: params[:id])

                if task.destroy
                    head: no_content
                else
                    render json: {error: task.errors.messages}, status: 422
                end
            end

            private

            def task_params
                params.require(:task).permit(:title, :description, :deadline, :category_id)
            end
        end
    end
end