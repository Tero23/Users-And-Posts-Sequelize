module.exports = (sequelize, DataTypes) => {
  const like = sequelize.define('like', {
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

  like.associate = (models) => {
    like.belongsTo(models.user);
    like.belongsTo(models.post);
  };

  return like;
};
