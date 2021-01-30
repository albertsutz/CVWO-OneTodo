class TaskSerializer
  include FastJsonapi::ObjectSerializer
  attributes :title, :description, :category_id, :completed
end
