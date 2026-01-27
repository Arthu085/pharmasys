import { useEffect, useState } from "react";
import { Typography, Card, Skeleton, message } from "antd";
import { profileService } from "../../infrastructure/services/profile.service";
import type { IProfileResponse } from "../../domain/dtos/profile-response.dto";
import { ProfileDetails } from "../components/profile-details";

const { Title } = Typography;

export const ProfilePage = () => {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<IProfileResponse | null>(null);

	const fetch = async () => {
		try {
			setLoading(true);
			const response = await profileService.profile();

			if (response.success && response.data) {
				setData(response);
			} else {
				message.error({
					content: response.message || "Não foi possível carregar os dados",
					duration: 5,
				});
			}
		} catch (error) {
			message.error({
				content: "Erro ao conectar com o servidor",
				duration: 5,
			});
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetch();
	}, []);

	return (
		<>
			<Title level={2} style={{ marginBottom: 24 }}>
				Meu Perfil
			</Title>
			<Card>
				<Skeleton loading={loading} avatar active paragraph={{ rows: 4 }}>
					{data?.data ? <ProfileDetails user={data.data} /> : null}
				</Skeleton>
			</Card>
		</>
	);
};
