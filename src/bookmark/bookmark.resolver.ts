import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { BookmarkService } from './bookmark.service';
import { Bookmark } from '@prisma/client';

@Resolver('Bookmark')
export class BookmarkResolver {
  constructor(private bookmarkService: BookmarkService) {}

  @Query()
  async bookmarks() {
    return await this.bookmarkService.getBookmarks();
  }

  @Query()
  async bookmarkByUser(@Args('userId') id: number) {
    return await this.bookmarkService.getBookmarkByUser(id);
  }

  @Mutation()
  async createBookmark(
    @Args('userId') userId: number,
    @Args('title') title: string,
    @Args('link') link: string,
  ) {
    return await this.bookmarkService.createBookmark(userId, title, link);
  }

  @Mutation()
  async modifyBookmark(
    @Args('id') id: number,
    @Args('title') title?: string,
    @Args('description') description?: string,
    @Args('link') link?: string,
  ) {
    return await this.bookmarkService.modifyBookmark(
      id,
      title,
      description,
      link,
    );
  }

  @Mutation()
  async deleteBookmark(@Args('id') id: number) {
    return await this.bookmarkService.deleteBookmark(id);
  }

  @ResolveField('user')
  getUser(@Parent() bookmark: Bookmark) {
    return { __typename: 'user', id: bookmark.userId };
  }
}
