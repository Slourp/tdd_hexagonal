describe("Feature: posting a message", () => {
    describe("Rule: A message can contain a maximum of 280 characteres", () => {
        test("Alice can post a message on her timelune", () => {
            givenNowis(new Date('2023-01-19T19:00:00.000Z'))

            whenUserPostsAmessage({
                id: 'message-id',
                author: 'Alice',
                text: 'Hellow world',
            })

            thenPostMessageshouldBe({
                id: 'message-id',
                text: 'Hellow world',
                author: 'Alice',
                publishedAt: new Date('2023-01-19T19:00:00.000Z')
            })
        })
    })
})

let message: {
    id: string,
    text: string,
    author: string,
    publishedAt: Date
} = {
    id: 'message-id',
    text: 'Hellow world',
    author: 'Alice',
    publishedAt: new Date('2023-01-19T19:00:00.000Z')
}
let now: Date
function givenNowis(actual_date: Date) {
    now = actual_date
}


function whenUserPostsAmessage(postMessageCommand: {
    id: string,
    text: string,
    author: string
}) {
    message = {
        id: postMessageCommand.id,
        text: postMessageCommand.text,
        author: postMessageCommand.author,
        publishedAt: now
    }
}

function thenPostMessageshouldBe(expectedMessage: {
    id: string,
    text: string,
    author: string,
    publishedAt: Date
}) {
    expect(expectedMessage).toEqual(message)
}
