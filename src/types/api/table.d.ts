declare namespace API {
  namespace getList {
    type ListItem = {
      author: string,
      display_time: string,
      id: string,
      pageviews: number,
      status: string,
      title: string
    }

    interface SuccessResult {
      items: ListItem[],
      total: number
    }
  }
}
