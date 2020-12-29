class TaskSerializer
  include FastJsonapi::ObjectSerializer
  attributes :title, :description, :deadline, :category_id
end
