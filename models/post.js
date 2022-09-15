module.exports = (sequelize, DataTypes) => {
  const post = sequelize.define('post', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'CASCADE',
      hooks: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    rating: {
      type: DataTypes.FLOAT,
      validate: {
        min: 1,
        max: 5,
      },
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

  post.associate = (models) => {
    post.belongsTo(models.user);
  };
  post.associate = (models) => {
    post.hasMany(models.like, {
      onDelete: 'CASCADE',
      hooks: true,
    });
  };
  post.associate = (models) => {
    post.hasMany(models.comment, {
      onDelete: 'CASCADE',
      hooks: true,
    });
  };

  return post;
};
