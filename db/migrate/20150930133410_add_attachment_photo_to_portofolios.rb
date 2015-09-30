class AddAttachmentPhotoToPortofolios < ActiveRecord::Migration
  def self.up
    change_table :portofolios do |t|
      t.attachment :photo
    end
  end

  def self.down
    remove_attachment :portofolios, :photo
  end
end
