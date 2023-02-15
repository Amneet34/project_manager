class ProjectSerializer < ActiveModel::Serializer
include Rails.application.routes.url_helpers
  attributes :id, :image, :description, :name

  def image
    rails_blob_path(object.image, only_path: true) if object.image.attached?
  end
end
