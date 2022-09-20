module.exports = (sequelize, DataTypes) => {
  const comment = sequelize.define('comment', {
    id: {
      allowNull: false,
      unique: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    text: {
      type: DataTypes.ENUM('bad', 'normal', 'good'),
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'CASCADE',
      hooks: true,
    },
    postId: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      references: {
        model: 'posts',
        key: 'id',
      },
      onDelete: 'CASCADE',
      hooks: true,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  });

  comment.associate = (models) => {
    comment.belongsTo(models.user);
    comment.belongsTo(models.post);
  };

  return comment;
};
