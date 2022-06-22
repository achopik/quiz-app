using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Quiz_Application.Services.Entities;
using Quiz_Application.Services.Repository.Interfaces;

namespace Quiz_Application.Services.Repository.Base
{
    public class TopicService<TEntity> : ITopic<TEntity> where TEntity : BaseEntity
    {
       private readonly QuizDBContext _dbContext;
       private DbSet<TEntity> _dbSet;
       public TopicService(QuizDBContext dbContext)
        {
            _dbContext = dbContext;
            _dbSet = dbContext.Set<TEntity>();
        }

       public EntityEntry DeleteTopic(TEntity entity)
       {
           var topic = _dbContext.Topic.Single(q => q.Id == entity.Id);
           return _dbContext.Topic.Remove(topic);
       }

       public async Task<List<Topic>> GetTopicList()
       {
           return await _dbContext.Topic.ToListAsync();
       }

       public EntityEntry AddTopic(TEntity entity)
       {
           return _dbContext.Add(entity);
       }

       public IQueryable<TEntity> SearchTopic(Expression<Func<TEntity, bool>> search = null)
        {
            IQueryable<TEntity> query = _dbSet;
            if (search != null)
            {
                query = query.Where(search);
            }
            return query;
        }

       public EntityEntry UpdateTopic(TEntity entity)
        {
            throw new NotImplementedException();
        }
    }
}
