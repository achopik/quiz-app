using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Quiz_Application.Services.Entities;

namespace Quiz_Application.Services.Repository.Interfaces
{
    public interface ITopic<TEntity>
    {
        Task<List<Topic>> GetTopicList();       
        IQueryable<TEntity> SearchTopic(Expression<Func<TEntity, bool>> search = null);
        EntityEntry AddTopic(TEntity entity);
        EntityEntry DeleteTopic(TEntity entity);
    }
}
