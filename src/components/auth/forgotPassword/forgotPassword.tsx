import s from './forgotPassword.module.scss'
import {Header} from "@/components/ui/header";
import {Card} from "@/components/ui/card/card.tsx";
import {Typography} from "@/components/ui/typography";
import {ControlledTextfield} from "@/components/ui/textfield/controlledTextfield.tsx";
import {Button} from "@/components/ui/button";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";


type Data = {
    email: string
}
type Props = {
    onSubmit: (data: Data) => void
}
const forgotPasswordSchema = z.object({
    email: z.string().email()
})
export const ForgotPassword = (props: Props) => {

    const {control, handleSubmit} = useForm<Data>({
        mode: 'onSubmit',
        defaultValues: {
            email: '',
        },
        resolver: zodResolver(forgotPasswordSchema),
    })
    return (

        <form
            onSubmit={handleSubmit(data => {
                props.onSubmit(data)
                console.log(data)
            })}
        >
            <div className={s.forgotPasswordWrapper}>
                <Header isAuth={false}/>
                <Card className={s.card}>
                    <Typography style={{color: 'var(--color-light-100)'}} variant={'large'}>Forgot your password?
                    </Typography>
                    <div className={s.textFieldWrapper}>
                        <ControlledTextfield control={control} name={'email'} label={'email'}/>
                        <div className={s.textWrapper}>
                            <Typography style={{color: 'var(--color-light-900)'}} variant={'body2'}>
                                Enter your email address and we will send you further instructions
                            </Typography>
                        </div>
                    </div>
                    <div className={s.buttonWrapper}>
                        <Button fullWidth={true}>Send Instructions</Button>
                        <div className={s.buttonTextWrapper}>
                            <Typography style={{color: 'var(--color-light-100)'}} variant={'body2'}>
                                Did you remember your password?
                            </Typography>
                        </div>
                        <div className={s.buttonLinkWrapper}>
                            <Button variant={'link'}>Try logging in</Button>
                        </div>
                    </div>
                </Card>
            </div>
        </form>

    );
};

