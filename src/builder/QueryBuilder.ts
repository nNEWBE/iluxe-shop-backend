import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
    public modelQuery: Query<T[], T>;
    public query: Record<string, unknown>;

    constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
        this.modelQuery = modelQuery;
        this.query = query;
    }

    search(searchableFields: string[]) {
        const search = this.query.search as string;
        if (search && searchableFields.length) {
            this.modelQuery = this.modelQuery.find({
                $or: searchableFields.map(field => ({
                    [field]: { $regex: search, $options: 'i' },
                })) as FilterQuery<T>[],
            });
        }
        return this;
    }

    sort() {
        const sortFields = (this.query.sortBy as string)?.split(',') || ['createdAt'];
        const sortOrder = this.query.sortOrder === 'desc' ? -1 : 1;

        const sortCriteria: [string, 1 | -1][] = sortFields.map(field => [field, sortOrder]);
        this.modelQuery = this.modelQuery.sort(sortCriteria);
        return this;
    }

    filter() {
        const queryObj = { ...this.query };

        const excludeFields = ['search', 'sortBy', 'sortOrder', 'limit', 'page', 'fields'];
        excludeFields.forEach((el) => delete queryObj[el]);

        const filterQuery: Record<string, unknown> = {};

        Object.keys(queryObj).forEach((key) => {
            if (typeof queryObj[key] === 'string' && queryObj[key].includes('-')) {
                const [min, max] = queryObj[key].split('-').map(Number);
                if (!isNaN(min) && !isNaN(max)) {
                    filterQuery[key] = { $gte: min, $lte: max };
                }
            } else {
                filterQuery[key] = queryObj[key];
            }
        });

        this.modelQuery = this.modelQuery.find(filterQuery as FilterQuery<T>);

        return this;
    }


    paginate() {
        const page = Number(this.query.page) || 1;
        const limit = Number(this.query.limit) || 6;
        const skip = (page - 1) * limit;

        this.modelQuery = this.modelQuery.skip(skip).limit(limit);
        return this;
    }

    fields() {
        const fields = (this.query.fields as string)?.split(',')?.join(' ') || '-__v';
        this.modelQuery = this.modelQuery.select(fields);
        return this;
    }
    
    async countTotal() {
        const totalQueries = this.modelQuery.getFilter();
        const total = await this.modelQuery.model.countDocuments(totalQueries);
        const page = Number(this?.query?.page) || 1;
        const limit = Number(this?.query?.limit) || 6;
        const totalPage = Math.ceil(total / limit);

        return {
            page,
            limit,
            total,
            totalPage,
        };
    }
}

export default QueryBuilder;
