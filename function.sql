create or replace function match_data_docs (
  query_embedding vector(1024),
  match_threshold float,
  match_count int
)
returns table (
  id bigint,
  content text,
  similarity float
)
language sql stable
as $$
  select
    data_docs.id,
    data_docs.content,
    1 - (data_docs.embedding <=> query_embedding) as similarity
  from data_docs
  where 1 - (data_docs.embedding <=> query_embedding) > match_threshold
  order by (data_docs.embedding <=> query_embedding) asc
  limit match_count;
$$;
