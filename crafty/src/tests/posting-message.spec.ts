import { InMemoryMessageRepository } from "./message.inmemory.repository"
import { DateProvider, Message, MessageRepository, MessageTooLongError, PostMessageUseCase, WhiteSpacesMessageError, postMessageCommand } from "./post-message.usecase"

describe("Feature: posting a message", () => {
    let fixtures: Fixtures
    beforeEach(() => {
        fixtures = createFixture()
    })
    describe("Rule: A message can contain a maximum of 280 characteres", () => {
        test("Alice can post a message on her timelune", () => {
            fixtures.givenNowis(new Date('2023-01-19T19:00:00.000Z'))

            fixtures.whenUserPostsAmessage({
                id: 'message-id',
                author: 'Alice',
                text: 'Hellow world',
            })

            fixtures.thenPostMessageshouldBe({
                id: 'message-id',
                text: 'Hellow world',
                author: 'Alice',
                publishedAt: new Date('2023-01-19T19:00:00.000Z')
            })
        })

        test("Alice can not post a message with more than 280 characters", () => {
            const textWithMoreThan280Characteres: string =
                "In ex Lorem consequat veniam labore mollit quis aliqua quis eu minim. Commodo adipisicing dolore tempor culpa consectetur ea magna ad sit exercitation culpa adipisicing. Labore non enim laboris dolore commodo officia sint dolor enim. Consectetur eu in ullamco non excepteur enim te."

            fixtures.givenNowis(new Date('2023-01-19T19:00:00.000Z'))

            fixtures.whenUserPostsAmessage({
                id: 'message-id',
                author: 'Alice',
                text: textWithMoreThan280Characteres,
            })

            fixtures.thenErrorShouldBe(MessageTooLongError)
        })
        test("Alice can not post a message with only white spaces", () => {
            const textWithWhiteSpaces: string =
                "      "

            fixtures.givenNowis(new Date('2023-01-19T19:00:00.000Z'))

            fixtures.whenUserPostsAmessage({
                id: 'message-id',
                author: 'Alice',
                text: textWithWhiteSpaces,
            })

            fixtures.thenErrorShouldBe(WhiteSpacesMessageError)
        })
    })
})








export class StubeDateProvider implements DateProvider {
    now!: Date
    getNow(): Date {
        return this.now
    }
}




export const createFixture = () => {
    const dateProvider = new StubeDateProvider()

    const messageRepository: MessageRepository = new InMemoryMessageRepository()

    const postMessageUseCase: PostMessageUseCase = new PostMessageUseCase(
        messageRepository,
        dateProvider
    )



    let thrownError: Error
    return {
        givenNowis(now: Date) {
            dateProvider.now = now
        },
        whenUserPostsAmessage(postMessageCommand: postMessageCommand) {
            try {
                postMessageUseCase.handle(postMessageCommand)
            } catch (error: any) {
                thrownError = error
            }
        },
        thenPostMessageshouldBe(expectedMessage: Message) {
            expect(expectedMessage).toEqual((messageRepository as InMemoryMessageRepository).message);
        },
        thenErrorShouldBe(expectErrorClass: new () => Error) {
            expect(thrownError).toBeInstanceOf(expectErrorClass)
        }


    }
}

type Fixtures = ReturnType<typeof createFixture>