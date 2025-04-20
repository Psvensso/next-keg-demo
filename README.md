# Getting Started

```bash
npm install && npm run dev
```

## Known limitations / Considerations

### Domain

Data normalization is not really a thing in this test repo, im treating the dev.db more as a readmodel, but then adding the applications and filters in the same DB for simplicity, these should probably not be in the same data store and should probably me normalized better.

### Next caching

Storing user data like that favorites in next cache can of course be debated, i did not want to implement a larger client side datastore, guess i could have used a simple zustand store for this. Anyway, now i implemented is using server components and the experimental cache tag system. In a real world scenario i guess some of this data would be better of in the client and implementing more in client/api, like the favorites and the backoffice for managing applications.

### Filters

Should have added more filters but ran out of time, needed to do some improvement to make it scale better and the UI with this ssr is a bit clunky. So more client side interactions would have been needed here. I did not have time to implement better search controllers otherwise of course better UI would be needed here.

### Tests

Im only creating a few unit tests and main flow e2e, im not implementing a full PO test for this simple project with the time assigned.

### Error handling

The error handling is not super nice for users, were just catching on the error routes. This could of course be improved a lot by having smaller boundaries and other error boundaries as well.

### Inconsistent growl and user feedback

Im using growl on a few places and in some not, user feedback should be better aligned but i wanted to try out more ways to do the server actions and working closely with next so i did not implement the full user experience and feedbacks everywhere. I though it would be nice to have it on the application form at least.

### Form validations

I did a quite simple zod implementation on the application form, could have been structured better. There are some bugs or limitations in the 15 form handling that i did not have time to solve. If the server is offline for example and the action fails when submitting an application the data in the form is lost/reset, very annoying. https://github.com/vercel/next.js/issues/72949
